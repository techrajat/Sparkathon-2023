import string
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

articles = pd.read_csv('articles.csv')
indices = pd.Series(articles.index, index=articles['article_id']).drop_duplicates()

# Taking only 10000 items :-
articles = articles[:10000]

cols = ['prod_name', 'product_type_name', 'product_group_name',
        'graphical_appearance_name', 'colour_group_name',
        'perceived_colour_value_name', 'perceived_colour_master_name',
        'department_name', 'index_name', 'index_group_name', 'section_name',
        'garment_group_name', 'detail_desc']

articles['combined_cols'] = articles[cols].apply(lambda row: ' '.join(row.values.astype(str)), axis=1)
articles = articles[['article_id', 'combined_cols']]

def text_process(desc):
    # Remove punctuation :-
    noPunc = [c for c in desc if c not in string.punctuation]
    noPunc = ''.join(noPunc)
    noPunc = noPunc.split()
    # Remove stopwords :-
    stopword = stopwords.words('english')
    desc_stopwords = [word.lower() for word in noPunc if word.lower() not in stopword]
    # Replace words with their respective stems :-
    stemmer = PorterStemmer()
    desc_cleaned = [stemmer.stem(word) for word in desc_stopwords]
    return desc_cleaned

from sklearn.feature_extraction.text import TfidfVectorizer
tfidf = TfidfVectorizer(analyzer=text_process)
tfidf_matrix = tfidf.fit_transform(articles['combined_cols'])

# Method for showing search results with a given description of the product :-
def search_result(desc, n):
    search_tfidf = tfidf.transform([desc])
    cos_sim = cosine_similarity(search_tfidf, tfidf_matrix)
    sim_scores = list(enumerate(cos_sim[0]))
    sim_scores.sort(key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[:n] # Get the top n results
    article_indices = [score[0] for score in sim_scores]
    return articles['article_id'].iloc[article_indices].values
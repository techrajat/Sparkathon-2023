import string
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
import pandas as pd
import pickle
from sklearn.metrics.pairwise import cosine_similarity

articles = pd.read_csv('articles.csv')
indices = pd.Series(articles.index, index=articles['article_id']).drop_duplicates()

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

# Load the tfidf_matrix from the pickle file :-
with open('tfidf.pkl', 'rb') as file:
    tfidf = pickle.load(file)
with open('tfidf_matrix.pkl', 'rb') as file:
    tfidf_matrix = pickle.load(file)


# Method for showing search results with a given description of the product :-
def search_result(desc):
    search_tfidf = tfidf.transform([desc])
    cos_sim = cosine_similarity(search_tfidf, tfidf_matrix)
    sim_scores = list(enumerate(cos_sim[0]))
    sim_scores.sort(key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[:50] # Get the top 50 results
    article_indices = [score[0] for score in sim_scores]
    return articles['article_id'].iloc[article_indices].values
import pandas as pd
import pickle

articles = pd.read_csv('articles.csv')
indices = pd.Series(articles.index, index=articles['article_id']).drop_duplicates()

# Load cos_sim from the pickle file :-
with open('recommender.pkl', 'rb') as file:
    cos_sim = pickle.load(file)

# Method to give top n recommendations :-
def recommendations(article_id, n):
    i = indices[article_id]
    sim_scores = list(enumerate(cos_sim[i]))
    sim_scores.sort(key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[:n]
    article_indices = [score[0] for score in sim_scores]
    return articles['article_id'].iloc[article_indices].values
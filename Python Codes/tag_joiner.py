from nltk.corpus import wordnet as wn
from itertools import product
tag = {'processor': (1, 'negative', ['slow']), 'battery': (1, 'negative', ['slow']), 'rear': (1, 'negative', ['poort']), 'phone': (1, 'negative', ['lagging']), 'product': (1, 'negative', ['happy']), 'camera': (1, 'negative', ['good']), 'display quality': (1, 'negative', ['bad']), 'camera quality': (1, 'negative', ['bad']), 'mobile': (1, 'mixed', ['good', 'good']), 'colour': (0, 'positive', ['nice', 'love']), 'features': (0, 'positive', ['love']), 'budget range': (0, 'positive', ['good']), 'light': (0, 'positive', ['good']), 'gaming': (0, 'positive', ['good']), 'display': (0, 'positive', ['good']), 'battery life': (0, 'positive', ['good']), 'performance': (0, 'positive', ['good']), 'budget phone': (0, 'positive', ['best']), 'service': (0, 'positive', ['best']), 'charging speed': (0, 'negative', ['slow']), 'amazon': (0, 'negative', ['ready']), 'speaker': (0, 'negative', ['poor']), 'photography': (0, 'negative', ['low light']), 'brightness': (0, 'negative', ['low']), 'miui': (0, 'negative', ['like']), 'front': (0, 'negative', ['lacks']), 'combo': (0, 'negative', ['hard to find']), 'product value': (0, 'negative', ['difficult']), 'ordering': (0, 'negative', ['difficult']), 'return policy': (0, 'negative', ['buy']), 'screen': (0, 'negative', ['blank']), 'image quality': (0, 'negative', ['below average']), 'experience': (0, 'negative', ['bad']), 'dot notch display': (0, 'mixed', ['ok'])}
updated_tag={}
keys = tag.keys()
# print(keys)
for key in keys:
    for iy in keys:
        wordx = key
        wordy = iy
        sem1, sem2 = wn.synsets(wordx), wn.synsets(wordy)
        # maxscore = 0
        for i,j in list(product(*[sem1,sem2])):
            score = i.wup_similarity(j) # Wu-Palmer Similarity
            # maxscore = score if maxscore < score else maxscore
        if score == None:
            score =0
        print ('%10s %-10s  %f ' % (wordx, wordy,score))
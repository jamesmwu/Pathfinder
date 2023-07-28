import json
import os

__location__ = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__)))
f = open(os.path.join(__location__, 'input.txt'), encoding="utf8")
# information#####
author = ""
tags = []
##################


sections = []

ulist = []
olist = []
errors = []

for line in f:
    if(len(ulist)!=0 and line[:4]!= "<ul>"):
        print(ulist)
        sections[-1]['body'].append({'type': 'ulist', 'list': ulist})
        ulist = []
    if(len(olist)!= 0 and line[:4] != '<ol>'):
        print(ulist)
        sections[-1]['body'].append({'type': 'olist', 'list': olist})
        olist = []
    if(line[:4] == '<h3>'):
        sections.append({'title': line[4:].strip(), 'body': []})
    elif(line[:4] == '<h4>'):
        sections[-1]['body'].append({'type':'subheading', 'text':line[4:].strip()})
    elif(line[:3] == '<p>'):
        sections[-1]['body'].append({'type': 'bodytext', 'text': line[3:].strip()})
    elif(line[:4] == '<ul>'):
        ulist.append(line[4:].strip())
    elif(line[:4] == '<ol>'):
        olist.append(line[4:].strip())
    else:
        errors.append(line)

if(len(ulist)!=0):
    sections[-1]['body'].append({'type': 'ulist', 'list': ulist})
if(len(olist)!= 0):
    sections[-1]['body'].append({'type': 'olist', 'list': olist})

# print(f"{len(errors)} errors detected:")
for error in errors:
    print(error)

# for section in sections:
#     print(section)
# output = open('output.txt', 'w')
# TAB = "    "
# start = ""

# def printField(fieldname, fieldvalue):
#     print(start + f'\"{fieldname}\" :\"{fieldvalue}\"', file = output)



# print('{', file = output)
# printField('title', titleSection['title'])
# printField('author', author)
output = open(os.path.join(__location__, 'output.txt'), 'w', encoding="utf8")
titleSection = sections.pop(0)
temp = {'title': titleSection['title'], 'author': author,'tags': tags, 'body': titleSection['body'], 'subArticles': sections}
#print(json.dumps(temp, indent = 4, ensure_ascii=False))
print(json.dumps(temp, indent = 4, ensure_ascii=False), file = output)

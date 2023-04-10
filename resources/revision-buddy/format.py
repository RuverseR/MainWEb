# Turns dictionary of keys and corresponding info into a set

import json


def replaceItems(list, before, after):
    for item in list:
        item = item.replace(before, after)

    return list


def convert():
    setName = input("Set Name: ")
    translations = json.loads(input("Dictionary: "))
    set = {'name': setName, 'quotes': []}

    for key, value in translations.items():
        if key != '':
            key = key.replace(' , ', ', ')
            value = replaceItems(value, ' , ', ', ')
            set['quotes'].append({'quote': key, 'info': value})

    print('\n\n\n---SET---')
    set = json.dumps(set, ensure_ascii=False)

    set = set.replace('"quotes": [', '"quotes": [\n\t')
    set = set.replace("]},", ']},\n       ')
    set = set.replace('}]}', '}]\n    },')

    print(set)


if __name__ == '__main__':
    convert()

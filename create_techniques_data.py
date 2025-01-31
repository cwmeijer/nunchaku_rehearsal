import json
import itertools

numerals = [
    "first", "second", "third", "fourth", "fifth",
    "sixth", "seventh", "eighth", "ninth", "tenth",
    "eleventh", "twelfth", "thirteenth", "fourteenth", "fifteenth",
    "sixteenth", "seventeenth", "eighteenth", "nineteenth", "twentieth",
    "twenty-first", "twenty-second", "twenty-third", "twenty-fourth", "twenty-fifth",
    "twenty-sixth", "twenty-seventh", "twenty-eighth", "twenty-ninth", "thirtieth",
    "thirty-first", "thirty-second", "thirty-third", "thirty-fourth", "thirty-fifth",
    "thirty-sixth", "thirty-seventh", "thirty-eighth", "thirty-ninth", "fortieth",
    "forty-first", "forty-second", "forty-third", "forty-fourth", "forty-fifth",
    "forty-sixth", "forty-seventh", "forty-eighth", "forty-ninth", "fiftieth"
]

strike_types = ['upward', 'downward', 'sideward', 'forward', 'combination', 'extension', ]
fragment = ['fragment']


def main():
    yellow_techniques = [f'{s} strike' for s in expand(numerals[:2], strike_types)] + expand(numerals[:5], fragment)
    orange_techniques = [f'{s} strike' for s in expand(numerals[2:4], strike_types)] + expand(numerals[5:10], fragment)
    green_techniques = [f'{s} strike' for s in expand(numerals[4:6], strike_types[:3] + strike_types[5:6])] + \
                       [f'{s} strike' for s in expand(numerals[4:5], strike_types[5:6])] + expand(numerals[10:15], fragment)
    blue_techniques = [f'{s} strike' for s in expand(numerals[6:8], strike_types[:3])] + expand(numerals[15:25], fragment)

    sorted(yellow_techniques + orange_techniques + green_techniques + blue_techniques,
           key=lambda x: (strike_types + fragment).index(x.split(' ')[1]))
    all_techniques_by_belt = {
        'yellow': yellow_techniques,
        'orange': orange_techniques,
        'green': green_techniques,
        'blue': blue_techniques
    }

    with open('techniques.json', 'w') as f:
        json.dump(all_techniques_by_belt, f, indent=2)


def expand(zero_to_two, types_):
    return [' '.join(t) for t in list(itertools.product(zero_to_two, types_))]


if __name__ == "__main__":
    main()

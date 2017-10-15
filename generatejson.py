import argparse
import base64
import json
import sys


def main(input_file, output_filename, maxResults):
    """Translates the input file into a json output file.

    Args:
        input_file: a file object, containing lines of input to convert.
        output_filename: the name of the file to output the json to.
    """
    request_list = []

    with open(input_file, 'rb') as image_file:
        content_json_obj = {
            'content': base64.b64encode(image_file.read()).decode('UTF-8')
        }

    feature_json_obj = []
    feature_json_obj.append({
        'type': 'SHOE_DETECTION',
        'maxResults': int(maxResults),
    })

    request_list.append({
        'features': feature_json_obj,
        'image': content_json_obj,
    })

    print request_list

    with open(output_filename, 'w') as output_file:
        json.dump({'requests': request_list}, output_file)

if __name__ == '__main__':
    main(sys.argv[1],sys.argv[2],sys.argv[3])
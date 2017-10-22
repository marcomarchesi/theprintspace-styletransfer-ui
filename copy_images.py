import argparse
from shutil import copyfile
import os


parser = argparse.ArgumentParser(description='copy images')
parser.add_argument('--content', help='content image')
parser.add_argument('--style', help='style image')
args = parser.parse_args()

segmentation_path = './segmentation/datasets/pspt/test'
results_path = './segmentation/results'
content_filename = os.path.basename(args.content) + '.png'
style_filename = os.path.basename(args.style) + '.png'
print(content_filename)
print(style_filename)

# remove all previous images
for root, dirs, files in os.walk(results_path):
    for filename in files:
        os.remove(os.path.join(root,filename))
for root, dirs, files in os.walk(segmentation_path):
    for filename in files:
        os.remove(os.path.join(root,filename))

copyfile(args.content, os.path.join(segmentation_path, content_filename))
print('copied the content image')
copyfile(args.style, os.path.join(segmentation_path, style_filename))
print('copied the style image')





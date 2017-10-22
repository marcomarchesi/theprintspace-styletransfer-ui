import argparse
from shutil import copyfile
import os


parser = argparse.ArgumentParser(description='copy images')
parser.add_argument('--content', help='content image')
parser.add_argument('--style', help='style image')
args = parser.parse_args()

segmentation_path = './segmentation/datasets/pspt/testA'
content_filename = os.path.basename(args.content) + '.png'
style_filename = os.path.basename(args.style) + '.png'

copyfile(args.content, os.path.join(segmentation_path, content_filename))
copyfile(args.style, os.path.join(segmentation_path, style_filename))





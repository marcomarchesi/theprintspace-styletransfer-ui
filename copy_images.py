import argparse
from shutil import copyfile
import os


parser = argparse.ArgumentParser(description='copy images')
parser.add_argument('--content', help='content image')
parser.add_argument('--style', help='style image')
parser.add_argument('--mode', help='mode')
args = parser.parse_args()

segmentation_path = './segmentation/datasets/pspt/test'
results_path = './segmentation/results'
style_transfer_path = './style_transfer/input'
content_filename = os.path.basename(args.content) + '.png'
style_filename = os.path.basename(args.style) + '.png'

if args.mode == 'segmentation':

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
elif args.mode == 'style_transfer':
    segmented_content_filename = os.path.basename(args.content) + '_fake_B.png'
    segmented_style_filename = os.path.basename(args.style) + '_fake_B.png'
    # copy content, style and segmentation images to style_transfer_path
    copyfile(os.path.join(segmentation_path, content_filename), os.path.join(style_transfer_path, 'content.png'))
    copyfile(os.path.join(segmentation_path, style_filename), os.path.join(style_transfer_path, 'style.png'))
    copyfile(os.path.join(results_path, segmented_content_filename), os.path.join(style_transfer_path, 'content_seg.png'))
    copyfile(os.path.join(results_path, segmented_style_filename), os.path.join(style_transfer_path, 'style_seg.png'))



    






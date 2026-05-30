from PIL import Image
import os

ImageFolder= os.getcwd()+'\Myapps\images\\'

with Image.open(ImageFolder+"captain.jpg") as pic:
    pic.show()
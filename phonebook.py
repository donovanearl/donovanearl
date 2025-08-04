from sqlalchemy import create_engine, Integer, String, Float, Column, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
from PyQt5.QtWidgets import QAbstractItemView,QApplication,QWidget,QLineEdit,QPushButton,QHBoxLayout,QVBoxLayout,QGridLayout,QLabel,QTableWidget,QTableWidgetItem
from PyQt5.QtGui import QRegExpValidator
from PyQt5 import Qt
from PyQt5.QtCore import QRegExp,Qt
import re


#App Settings
app=QApplication([])
main_window=QWidget()
main_window.setWindowTitle('TheFonebook')
main_window.setFixedSize(300,500)

num_Validator=QRegExpValidator(QRegExp(r"^\+?\d{0,20}$")) #Uses RegEx to validate till 20 Digits and a + sign

#Add objects/ widgets
text_box=QLineEdit()
text_boxnum=QLineEdit()
text_box.setPlaceholderText('')
text_box.setDisabled(True)
text_boxnum.setPlaceholderText('')
text_boxnum.setDisabled(True)
#text_boxnum.setValidator(QIntValidator()) # Downside is only 10 digits
text_boxnum.setValidator(num_Validator)
command={'value':None}
field={'value:':None}

#add Buttons
add_button=QPushButton('Add')
del_button=QPushButton('Del')
edit_button=QPushButton('Edit')
ok_button=QPushButton('OK')
ok_button.setDisabled(True)

#Labels
label1=QLabel('Input')

#Table display
list_table=QTableWidget()
list_table.setEditTriggers(QAbstractItemView.EditTrigger(0)) #disabled edit in table
list_table.setColumnCount(2)
list_table.setHorizontalHeaderLabels(['Name','Number'])
#sort items on column click
list_table.setSortingEnabled(True)



#DesignLayout
master_layout=QVBoxLayout()
master_layout.addWidget(list_table)

row1=QHBoxLayout()
row1.addWidget(add_button)
row1.addWidget(del_button)
row1.addWidget(edit_button)

row2=QHBoxLayout()
row2.addWidget(label1,35,alignment=Qt.AlignCenter)
row2.addWidget(text_box,65)

row3=QHBoxLayout()
row3.addWidget(ok_button,25,alignment=Qt.AlignCenter)
row3.addWidget(text_boxnum,75)


master_layout.addLayout(row1)
master_layout.addLayout(row2)
master_layout.addLayout(row3)


# Retrieve password from file
fh=open('c:/Users/Donf/python_p/.env')
for line in fh:
    if '=' in line and not line.startswith('#'):
        key, value = line.strip().split('=', 1)
        p = value
password=p
print(password)

engine= create_engine(f'postgresql+psycopg2://postgres:{password}@localhost:5432/phonebook',echo= True)
Base=declarative_base()

class Person(Base):
    __tablename__= 'people'
    id=Column(Integer,primary_key=True)
    name=Column(String, nullable=False)
    number=Column(String)

#------------Prepping connection / cursor---------------------------------#

Base.metadata.create_all(engine)
Session=sessionmaker(bind=engine)

#--------Functions---------#

#adding new entry to phonebook
def new_person():
    
    session=Session()
    new_name=text_box.text().strip()
    new_number=text_boxnum.text().strip()
    user=session.query(Person).filter_by(name=new_name).first()
    
    if not new_name or not new_number:
        text_box.setPlaceholderText('Invalid input, Enter Name here')
        text_boxnum.setPlaceholderText('Invalid input, Enter Number here')
        
    elif user:
        text_box.setPlaceholderText('Name already Exist!, Try again')
       
    else:
            
        person=Person(name=f'{new_name}',number=f'{new_number}')
        session.add(person)
    
    session.commit()
    session.close()
    text_box.clear()
    text_boxnum.clear()
    show_all_person()

    

def del_person():
    
    session=Session()
      
    #check if user has data or if user is TRUE after the query
    try:
           
        del_name=clicked_Field()
        user=session.query(Person).filter_by(name=del_name).first()
        if user:
            session.delete(user)
            session.commit()
            show_all_person()
    except:
        text_box.setPlaceholderText('Nothing to Delete!')

def upd_person(): #TODO BUG: if clicked field is empty, nothing happens########################################
    
    session=Session()
    print('REAACHED here')
    try:
        upd_name=clicked_Field
        print('upd_name ni',upd_name)
        user=session.query(Person).filter_by(name=upd_name).first()
        print('USERR:',user.name)

        if user.name == upd_name:
            print('DIRE ta:',user.name)
            edited_name=text_box.text()
            #edited_num=text_boxnum.text()
            user.name = edited_name
            #user.number=edited_num

            session.add(user)
            session.commit()
            show_all_person()
        elif user.number==upd_name:
            print('Nothing to update++')

        else:
            print('DIRE MO:',user.name)
            #edited_name=text_box.text()
            edited_num=text_boxnum.text()
            #user.name = edited_name
            user.number=edited_num

            session.add(user)
            session.commit()
            show_all_person()
    except:
        text_box.setPlaceholderText('Nothing to Edit!')
    
def show_all_person():
    
    session=Session()
    All_user=session.query(Person).all()#filter_by(name=input('Name:')).first()

    count_row=0
    count_col=0
    
    for i in All_user:
            #print('Here:',i.name,i.number)           
            list_table.setRowCount(len(All_user))
            list_table.setItem(count_row,count_col,QTableWidgetItem(i.name))
            list_table.setItem(count_row,1,QTableWidgetItem(i.number))
            count_row+=1
            #print('Row',count_row)
    

def clicked_Field():
    selected_item= list_table.selectedItems()
    print('Selected items',selected_item[0].text())
    field['value']=selected_item[0].text()
    return selected_item[0].text()

#function to get the text value of the button being pressed, use it for command when pressing Ok_button#
def clicked_Button(): #FIXED
    
    #print('Field Value:',field['value'])
    field_v=field['value']
    field_v=str(field_v)
    if re.search(r"[a-z,A-Z]",field_v):
        
        clicked_Button=app.sender().text()
        text_box.setDisabled(False)
        #text_boxnum.setDisabled(False)
        text_box.setPlaceholderText('Enter Name')
        #text_boxnum.setPlaceholderText('Enter Number')
        ok_button.setDisabled(False)
        print('Clicked Button:',clicked_Button)
        command['value']=str(clicked_Button).lower()  #Used a dictionary to forward text value to another function clicked_commitButton#
        print('command',command['value'])
    else:
        clicked_Button=app.sender().text()
        #text_box.setDisabled(False)
        text_boxnum.setDisabled(False)
        #text_box.setPlaceholderText('Enter Name')
        text_boxnum.setPlaceholderText('Enter Number')
        ok_button.setDisabled(False)
        print('Clicked Button:',clicked_Button)
        command['value']=str(clicked_Button).lower()  #Used a dictionary to forward text value to another function clicked_commitButton#
        print('commandSTR',command['value'])

#function for the Ok_button#
def clicked_commitButton():  
    command_text=command['value']
   
    if command_text=='add':
        new_person()
        text_box.setDisabled(True)
        text_boxnum.setDisabled(True)
        text_box.setPlaceholderText('')
        text_boxnum.setPlaceholderText('')
    elif command_text=='del':
        del_person()
    elif command_text=='edit':
        print('Reached++++')
        upd_person()
        text_box.setDisabled(True)
        text_boxnum.setDisabled(True)
        text_box.clear()
        text_boxnum.clear()
        text_box.setPlaceholderText('')
        text_boxnum.setPlaceholderText('')
    else:
        print('Nothing pressed')

## Start executing

show_all_person()


list_table.itemClicked.connect(clicked_Field)
add_button.clicked.connect(clicked_Button)
del_button.clicked.connect(del_person)
edit_button.clicked.connect(clicked_Button)
ok_button.clicked.connect(clicked_commitButton)

main_window.setLayout(master_layout)   
main_window.show()
app.exec_()

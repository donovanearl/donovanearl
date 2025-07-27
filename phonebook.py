from sqlalchemy import create_engine, Integer, String, Float, Column, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
from PyQt5.QtWidgets import QAbstractItemView,QApplication,QWidget,QLineEdit,QPushButton,QHBoxLayout,QVBoxLayout,QGridLayout,QLabel,QTableWidget,QTableWidgetItem
from PyQt5 import Qt


#App Settings
app=QApplication([])
main_window=QWidget()
main_window.setWindowTitle('TheFonebook')
main_window.setFixedSize(320,500)

in_data=[]
tup=()

#Add objects/ widgets
text_box=QLineEdit()
text_boxnum=QLineEdit()
text_box.setPlaceholderText('Enter Name')
text_boxnum.setPlaceholderText('Enter Number')

add_button=QPushButton('Add')
del_button=QPushButton('Del')
edit_button=QPushButton('Edit')
label1=QLabel('Input')
label2=QLabel()

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
row2=QHBoxLayout()
row1.addWidget(label1,20)
row1.addWidget(text_box,70)
row2.addWidget(label2,20)

row2.addWidget(text_boxnum,70)

button_row=QHBoxLayout()
button_row.addWidget(add_button)
button_row.addWidget(del_button)
button_row.addWidget(edit_button)

master_layout.addLayout(button_row)
master_layout.addLayout(row1)
master_layout.addLayout(row2)


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

#------------Prepping---------------------------------------#

Base.metadata.create_all(engine)
Session=sessionmaker(bind=engine)

#adding new entry to phonebook
def new_person():
    
    session=Session()
    new_name=text_box.text().strip()
    new_number=text_boxnum.text().strip()
    
    if not new_name or not new_number:
        text_box.setPlaceholderText('\'Cannot be empty, try again\'')
        text_boxnum.setPlaceholderText('\'Cannot be empty, try again\'')
    #Work AREA--------------------------------------------
    # Erroe line elif new_name is not str:
        text_box.setPlaceholderText('Invalid Input, only letters')
       
    else:
            
        person=Person(name=f'{new_name}',number=f'{new_number}')
        session.add(person)
    
    session.commit()
    session.close()
    text_box.clear()
    text_boxnum.clear()

    
    """user_query= session.query(Person).filter_by(name=new_name).first()

    #check to see if new_name is already in the database
    if user_query:
        user_option=""
        while user_option=="":

            print(f'Do you want to name it \"{person.name}1\" instead')
            user_option=(input('y / n? '))
            user_option=user_option.lower().strip()
            if user_option=='y':
                person.name=person.name+"1"
                session.add(person)
                session.commit()

            elif user_option=='n':
                x=0
                while x==0:
                    new_person_name=person.name
                    print('Samesame')
                    new_person_name=(input('try another: '))
                    if new_person_name==person.name:
                        continue
                    else:
                        x=1
                        person.name=new_person_name
                        session.add(person)
                        session.commit()"""

def del_person():
    
    session=Session()
    user=session.query(Person).filter_by(name=input('Name:')).first()
    
    #check if user has data or if user is TRUE after the query
    if user:
        session.delete(user)
        session.commit()
def upd_person():
    
    session=Session()
    user=session.query(Person).filter_by(name=input('Name:')).first()
    
    #check if user has data or if user is TRUE after the query
    if user:
        x=1
        while x==1:
            option=input(f'Name or Number?: ')
            option.lower()
            try:
                if option=='name':
                    n_name=input('New name: ')
                    user.name=n_name
                    x=0
                elif option=='number':
                    n_number=input('New number: ')
                    user.number=n_number
                    x=0
                else:
                    print('not valid option')
                    continue
                
            except:
                print('No input error!')
        session.commit()

def show_all_person():
    
    session=Session()
    All_user=session.query(Person).all()#filter_by(name=input('Name:')).first()
#------------Working area-----------    
    count_row=0
    count_col=0
    for i in All_user:
            #print('Here:',i.name,i.number)           
            list_table.setRowCount(len(All_user))
            list_table.setItem(count_row,count_col,QTableWidgetItem(i.name))
            list_table.setItem(count_row,1,QTableWidgetItem(i.number))
            count_row+=1
            #print('Row',count_row)
       


show_all_person()
add_button.clicked.connect(new_person)
main_window.setLayout(master_layout)   
main_window.show()
app.exec_()

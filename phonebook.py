from sqlalchemy import create_engine, Integer, String, Float, Column, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
from PyQt5.QtWidgets import QApplication,QWidget,QLineEdit,QListWidget,QPushButton,QHBoxLayout,QVBoxLayout,QGridLayout


#App Settings
app=QApplication([])
main_window=QWidget()
main_window.setWindowTitle('TheFonebook')
main_window.resize(300,400)

in_data=[]

#Add objects/ widgets
text_box=QLineEdit()
list_box=QListWidget()
add_button=QPushButton('Add')
del_button=QPushButton('Del')
edit_button=QPushButton('Edit')



#DesignLayout
master_layout=QVBoxLayout()
master_layout.addWidget(list_box)
master_layout.addWidget(text_box)

button_row=QHBoxLayout()
button_row.addWidget(add_button)
button_row.addWidget(del_button)
button_row.addWidget(edit_button)
master_layout.addLayout(button_row)



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



#adding new entry to phonebook
def new_person():
    Base.metadata.create_all(engine)
    Session=sessionmaker(bind=engine)
    session=Session()
    new_name=input('Name:')
    new_number=input('Number:')
    
    person=Person(name=f'{new_name}',number=f'{new_number}')
    
    user_query= session.query(Person).filter_by(name=new_name).first()

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
                        session.commit()

             
            


def del_person():
    Base.metadata.create_all(engine)
    Session=sessionmaker(bind=engine)
    session=Session()
    user=session.query(Person).filter_by(name=input('Name:')).first()
    
    #check if user has data or if user is TRUE after the query
    if user:
        session.delete(user)
        session.commit()
def upd_person():
    Base.metadata.create_all(engine)
    Session=sessionmaker(bind=engine)
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
    
    Base.metadata.create_all(engine)
    Session=sessionmaker(bind=engine)
    session=Session()
    All_user=session.query(Person).all()#filter_by(name=input('Name:')).first()
    for i in All_user:
        print('Name: ',i.name,'Number: ',i.number)
        in_data.append(i.name)

show_all_person()

list_box.addItems(in_data)

main_window.setLayout(master_layout)   
main_window.show()
app.exec_()
#new_person()
#show_all_person()
#Test for .gitignore
#Test for no .gitignore in repo
#upd_person()
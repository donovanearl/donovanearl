from sqlalchemy import create_engine, Integer, String, Float, Column, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship


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

def new_name():
    name=input('Name:')
    return name
def new_number():
    number=input('Number:')
    return number

#adding new entry to phonebook
def new_person():
    Base.metadata.create_all(engine)
    Session=sessionmaker(bind=engine)
    session=Session()
    person=Person(name=f'{new_name()}',number=f'{new_number()}')
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

def show_all_person():
    
    Base.metadata.create_all(engine)
    Session=sessionmaker(bind=engine)
    session=Session()
    All_user=session.query(Person).all()#filter_by(name=input('Name:')).first()
    for i in All_user:
        print('Name: ',i.name,'Number: ',i.number)
    

#new_person()
show_all_person()
#Test for .gitignore
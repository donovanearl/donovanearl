from sqlalchemy import create_engine, Integer, String, Float, Column, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship

password="DanDae123"
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
    
    if user:
        session.delete(user)
        session.commit()


del_person()
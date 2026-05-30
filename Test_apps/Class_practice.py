

class Customers:

    def __init__(self,name,phone,email):
        self.name=name
        self.phone=phone
        self.email=email

    def changePhone(self,phone):
        self.phone=phone
    def phone(self):
        return f"Phone:{self.phone}"

    def __str__(self):
        return f"Name:{self.name} Phone:{self.phone}"

customer=Customers("Donf","0506791454","email.com")


def add(num1,num2):
    print(num1+num2)


class Bridge:
    def __init__(self,a,b):
        self.a=a
        self.b=b
    
    def connect(self,a,b):
        return print(a,b)
    # def __str__(self):
    #     return f"{self.a}{self.b}"
    
# bankerohan=Bridge("matina","ilustre")
# bankerohan.connect("matina","ilustre")

class Product:
    """Base class for all products"""
    
    def __init__(self, name, price, stock):
        self.name = name
        self.price = price
        self.stock = stock
    
    def is_available(self):
        """Check if product is in stock"""
        return self.stock > 0
    
    def purchase(self, quantity=1):
        """Purchase the product"""
        if quantity > self.stock:
            print(f"Sorry, only {self.stock} {self.name}(s) available!")
            return False
        
        self.stock -= quantity
        total = self.price * quantity
        print(f"Purchased {quantity} {self.name}(s) for ${total:.2f}")
        return True
    
    def __str__(self):
        return f"{self.name} - ${self.price} ({self.stock} in stock)"
    
oil=Product("Olive",30,3)

print(oil.purchase())








    


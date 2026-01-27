def add(a,b):
    return a+b
def multiply(a,b):
         return a*b


def calculate(method,a,b):
   
    return "This is Multiply:",method(a,b)


print(calculate(add,3,5))

print(calculate(multiply,5,5))

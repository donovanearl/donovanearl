import time
t1=time.perf_counter()
def square_num(nums):
    squared=[]
    for i in nums:
        squared.append(i*i)
    
    return squared

numbers=[1,3,5,7,9]

x=square_num(numbers)
print(x)
t2=time.perf_counter()

# t1=time.perf_counter()
# def square_num(nums):
#     for i in nums:
#         yield i*i

# x=square_num(numbers)
# for i in x:
#     print(i)
# t2=time.perf_counter()

print(f"Took {format(t2-t1)} seconds")
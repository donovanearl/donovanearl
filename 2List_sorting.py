arr=[12,3,4,2,15]
sorted_arr=[]
leng=len(arr)

while leng>0:
            smallest=None
            index=None

            for a,b in enumerate(arr):
                if smallest is None:
                    smallest=b
                    index=a
                else:
                    if b<smallest:
                          smallest=b
                          index=a
            print('Smallest num:',smallest)
            sorted_arr.append(smallest)
            arr.pop(index)

            print('Sorted:',sorted_arr)

                       

                
            leng=leng-1
            
                
              
        
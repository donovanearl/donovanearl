numbers = [1, 3, 2, 5, 4] 
n = len(numbers) 

#get the lowest index
for i in range(n): 
    min_index = i 
    

    #Getting the next index
    for j in range(i + 1, n): 
        print('j =',j,'V= ',numbers[j],'    min_index=',min_index, 'V= ',numbers[min_index])
        print('i:', i)
        if numbers[j] < numbers[min_index]: 
            min_index = j 
        # Swap smallest found with the first unsorted element 
        
            numbers[i], numbers[min_index] = numbers[min_index], numbers[i] 


#print(numbers)  # Output: [1, 2, 3, 4, 5]       

numbers = [1, 3, 2, 5, 4] 
n = len(numbers) 
for i in range(n): 
    min_index = i 
    for j in range(i + 1, n): 
        if numbers[j] < numbers[min_index]: 
            min_index = j 
            # Swap smallest found with the first unsorted element 
            print(f'numbers[i]: ',numbers[i],'numbers[min_index: ]',numbers[min_index])
            numbers[i], numbers[min_index] = numbers[min_index], numbers[i] 
            print(f'numbers[i]: ',numbers[i],'numbers[min_index: ]',numbers[min_index])
#print(numbers)  # Output: [1, 2, 3, 4, 5] 
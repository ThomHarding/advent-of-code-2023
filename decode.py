def decode(message_file):
	"""
	Function that takes a string for input filename and returns a string
	containing the decoded message.
	"""
	# create an empty dictionary to store the number and associated word read from file
	message_dict = {}
	
	# open file to read
	file = open(message_file)
	
	# loop over the file line by line
	for line in file:
		# remove leading and trailing whitespace from line and split the line to get the number and word in data list
		data = line.strip().split()
		# insert the number as key and word as value
		message_dict[int(data[0])] = data[1]
		
	file.close() # close the file

	# get the list of keys of the dictionary in numbers list
	numbers = list(message_dict.keys())
	numbers.sort() # sort the numbers list in ascending order
	
	# create a list of lists where the first element is a list containing first value of numbers
	pyramid = [[numbers[0]]]
	
	i = 1 # set i to 1
	current_list_length = len(pyramid[i-1]) + 1 # determine the length of next row of pyramid
	row = [] # create an empty list for row
	# loop over the numbers list
	while i < len(numbers):
		# row contains less elements than current_list_length
		if len(row) < current_list_length:
			row.append(numbers[i]) # append ith element of numbers to row
			i = i + 1 # increment i by 1
		else: # row contains current_list_length number of elements
			pyramid.append(row) # append the row to pyramid
			row = []  # set row to empty list
			current_list_length = len(pyramid[len(pyramid)-1]) + 1 # determine the length of next row of pyramid
					
	# row was not added to pyramid, append the row to pyramid
	if row != []:
		pyramid.append(row)
	
	message = "" # set message to empty string
	
	# loop over the rows of pyramid
	for i in range(len(pyramid)):
		message += message_dict[pyramid[i][-1]] + " " # append the last word of current list of pyramid to message followed by a space
		
	return message.strip() # remove leading and trailing whitespace from message
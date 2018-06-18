
import threading


from tools.windows import get_window_name



def log_usage(counter):
	'''
	Increment window usage
	'''
	counter[get_window_name()] += 1

def update_storage():
	'''
	Save the current day's log into the storage
	'''
	pass
	# this could be a dump of `usage` into a *.json file or a full-fledged database.




# class TaskThread(threading.Thread):
#     """
# 	Creates a threading.Thread object that calls `func` with 
# 	arguments `args` every `interval` intervals.

#     Adapted from http://code.activestate.com/recipes/65222-run-a-task-every-few-seconds/
#     """
    
#     def __init__(self={}):
#         threading.Thread.__init__(self)
#         self._finished = threading.Event()
#         self._interval = 15.0
    
#     def shutdown(self):
#         """Stop this thread"""
#         self._finished.set()

#     def setInterval(self, interval):
#         """Set the number of seconds we sleep between executing our task"""
#         self._interval = interval

#     def run(self):
#         while 1:
#             if self._finished.isSet(): return
#             self.task()
            
#             # sleep for interval or until shutdown
#             self._finished.wait(self._interval)
    
#     def task(self):
#         """The task done by this thread - override in subclasses"""
#         self._func(*self._args)


# class LogUsageTaskThread(TaskThread):
# 	def __init__(self, interval=1):
# 		TaskThread.__init__(self)
# 		self.setInterval(interval)

# 	def task(self):
# 		print('updating..')
# 		#usage[get_window_name()] += 1

# def dummy():
# 	print("hello")

# def dummy2():
# 	print("hi")

# dummythread = LogUsageTaskThread()
# dummythread.start()
# print(usage)

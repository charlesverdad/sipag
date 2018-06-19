
import threading
import json
from collections import Counter
import os
from datetime import datetime

from tools.windows import get_window_name
from config import config


def log_usage(counter):
    '''
    Increment window usage
    '''
    counter[get_window_name()] += 1

def update_storage(counter):
    '''
    Save the current day's log into the storage
    '''
    # this could be a dump of `usage` into a *.json file or a full-fledged database.
    fn = config['fn_format'].format(date=datetime.today().strftime('%Y_%m_%d'))
    file_path = os.path.join(config['data_path'], fn)

    old_counter = {}

    if os.path.isfile(file_path):
        with open(file_path) as f:
            old_counter = Counter(json.loads(f.read()))
        
        for k in counter:
            old_counter[k] += counter[k]
    else:
        old_counter = counter
        
    with open(file_path, 'w') as f:
        f.write(json.dumps(old_counter))








# class TaskThread(threading.Thread):
#     """
#     Creates a threading.Thread object that calls `func` with 
#     arguments `args` every `interval` intervals.

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
#     def __init__(self, interval=1):
#         TaskThread.__init__(self)
#         self.setInterval(interval)

#     def task(self):
#         print('updating..')
#         #usage[get_window_name()] += 1

# def dummy():
#     print("hello")

# def dummy2():
#     print("hi")

# dummythread = LogUsageTaskThread()
# dummythread.start()
# print(usage)

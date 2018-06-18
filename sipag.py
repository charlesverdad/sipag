import threading
from threading import Thread
from collections import Counter
from time import sleep

from tasks import log_usage
usage = Counter()

def continuously_log():
	global usage
	lock = threading.Lock()
	while True:
		with lock:
			log_usage(counter=usage)
		sleep(1)

def continuously_save():
	global usage
	lock = threading.Lock()
	while True:
		with lock:
			print(usage)
		sleep(5)

logger_thread = Thread(target=continuously_log)
logger_thread.daemon = True
logger_thread.start()

saver_thread = Thread(target=continuously_save)
saver_thread.daemon = True
saver_thread.start()

print("heyo")
sleep(2)
print ('heya')
sleep(3)
while True:
	sleep(60)
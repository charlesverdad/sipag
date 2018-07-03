import threading
from threading import Thread
from collections import Counter
from time import sleep
import logging
from tendo.singleton import SingleInstance

from tasks import log_usage, update_storage
from config import config

usage = Counter()

def continuously_log():
    global usage
    lock = threading.Lock()
    while True:
        with lock:
            log_usage(counter=usage)
        sleep(config['log_interval'])

def continuously_save():
    global usage
    lock = threading.Lock()
    while True:
        with lock:
            print(usage)
            update_storage(usage)
            usage = Counter()
        sleep(config['save_interval'])

me = SingleInstance()

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
while logger_thread.is_alive() and saver_thread.is_alive():
    sleep(60)
import win32gui as w

def get_window_name():
    '''
    Returns the window title of the currently focused window
    '''
    return w.GetWindowText(w.GetForegroundWindow())


'''
References:
http://timgolden.me.uk/pywin32-docs/win32gui.html
'''

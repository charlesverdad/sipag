from pathlib import Path
import os
config = {
	'fn_format': '{date}_usage.json',
	'log_interval': 1,  # 1 second
	'save_interval': 10, # 1 minute
}

# TODO: create this directory upon installation
config['data_path'] = os.path.join(Path.home(), '.sipag')

if os.name == 'nt':
	config['data_path'] = os.path.join(Path.home(), 'AppData', 'Roaming', 'Likha', 'sipag')
server/ hosts the code responsible for connecting with Chrome instances
client/ hosts the code that is responsible for connect with end users

To install Arboretum:
First, clone the repo using the command:
	git clone XXXXXXX
Next, install node.js using their website nodejs.org. Then install Electron using the command:
	sudo npm install -g electron-prebuilt
Now Electron should be working. To run Arboretum, run the command:
	electron .
If this is not working, test Electron by running the following command:
	electron
This should open the Electron application. If it opens, close it and then run the following command to ensure that all packages are present:
	npm install .
Now try running this command again:
	electron .


# assignment1_frameworks
# Zane Stevens -- s5072430

## Git Organisation
Git Organisation was simple and basic. Branches weren't used for any part of the project due to my personal profficiency with Git and Project development in general and have just been using the Master branch for all commits and pushes. Commits were made at the end of every development session wih semi-detailed messages, though these are detailed in a way that I would understand each commit (which is bad practice). 

## Data Structures
Two .JSON files were used to manage the data of the website:
- One for User Data (name, status, email, password)
- One for Group Data (name, channels, channel members, channel name, group assists)

## Angular Architecture
The architecture was kept simple:
- Components for Login, User-Edit, User-Delete, Group/Channel-Edit/Delete and Chat (Main page)
- Services for Data Collection and Saving (root(should have named it something better)) and Sockets
- Models for Server, Listening for requests and sockets
- Routes were used in the navigatio of all pages using the RouterModule import

## Node Server Architecture
As the Angular Architecture, the Node architecture was kept simple:
- (the node require stuff)

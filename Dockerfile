FROM    centos:centos6

# Enable EPEL for Node.js
RUN     rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
# Install Node.js and npm
RUN     yum install -y npm

# Bundle app source
COPY . /container

# Install app dependencies
RUN cd /container; npm install; npm install http-server -g

EXPOSE 5000
#CMD ["node", "/container/index.js"]
CMD ["http-server", "/container/release"]
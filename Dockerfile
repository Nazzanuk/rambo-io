FROM    centos:centos6

# Enable EPEL for Node.js
RUN     rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
# Install Node.js and npm
RUN     yum install -y npm
RUN     yum update ruby
RUN     yum install rubygems -y
RUN     echo "testindividual"
#CMD     ["yum install rubygems", "y"]
RUN     gem update --system

# Install gems
RUN gem install sass

# Bundle app source
COPY . /app

# Install app dependencies
RUN cd /app; npm install; npm install http-server -g;npm install -g gulp
RUN cd /app; gulp

EXPOSE 5000
#CMD ["node", "/container/index.js"]
CMD ["http-server", "/container/release"]
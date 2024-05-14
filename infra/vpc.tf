# Define a VPC
resource "aws_vpc" "app_vpc" {
  cidr_block = var.vpc_cidr
  enable_dns_support = true
  enable_dns_hostnames = true

  tags = {
    Name = "AppVPC"
  }
}

# Create a public subnet
resource "aws_subnet" "app_subnet" {
  vpc_id            = aws_vpc.app_vpc.id
  cidr_block        = var.subnet_cidr
  map_public_ip_on_launch = true

  tags = {
    Name = "AppSubnet"
  }
}

# Create an internet gateway for the VPC
resource "aws_internet_gateway" "app_gateway" {
  vpc_id = aws_vpc.app_vpc.id

  tags = {
    Name = "AppInternetGateway"
  }
}

# Create a route table and a public route
resource "aws_route_table" "app_route_table" {
  vpc_id = aws_vpc.app_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.app_gateway.id
  }

  tags = {
    Name = "AppRouteTable"
  }
}

# Associate the route table to the subnet
resource "aws_route_table_association" "app_route_association" {
  subnet_id      = aws_subnet.app_subnet.id
  route_table_id = aws_route_table.app_route_table.id
}

# Define a security group for your ECS tasks
resource "aws_security_group" "ecs_sg" {
  name        = "ecs-security-group"
  description = "Security group for ECS tasks"
  vpc_id      = aws_vpc.app_vpc.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "ECSSecurityGroup"
  }
}

# Add more security group rules as needed for other services

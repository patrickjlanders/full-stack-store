resource "aws_db_instance" "postgres_db" {
  instance_class   = "db.t2.micro"
  allocated_storage = 20
  engine            = "postgres"
  username          = "postgres"
  password          = var.db_password
  db_name           = "mydb"
}

variable "db_password" {
  type        = string
  description = "Password for the database."
}

variable "aws_region" {
  type        = string
  description = "AWS region to launch resources."
  default     = "us-east-1"
}

variable "subnet_ids" {
  type        = list(string)
  description = "List of subnet IDs for ECS deployment"
}

variable "security_group_ids" {
  type        = list(string)
  description = "List of security group IDs for ECS service"
}

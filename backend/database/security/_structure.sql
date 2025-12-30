-- Security Schema Tables

CREATE SCHEMA IF NOT EXISTS security;

-- Users Table
CREATE TABLE IF NOT EXISTS security.Users (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NULL,
    FullName NVARCHAR(100) NOT NULL,
    UserType NVARCHAR(50) NOT NULL,
    RegistrationMethod NVARCHAR(50) NOT NULL,
    SocialId NVARCHAR(255) NULL,
    EmailConfirmed BIT DEFAULT 0,
    ConfirmationToken NVARCHAR(255) NULL,
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    LastLogin DATETIME2 NULL
);

-- Roles Table
CREATE TABLE IF NOT EXISTS security.Roles (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(50) NOT NULL UNIQUE,
    Description NVARCHAR(255) NULL
);

-- UserRoles Table
CREATE TABLE IF NOT EXISTS security.UserRoles (
    UserId INT NOT NULL,
    RoleId INT NOT NULL,
    AssignedAt DATETIME2 DEFAULT GETDATE(),
    PRIMARY KEY (UserId, RoleId),
    FOREIGN KEY (UserId) REFERENCES security.Users(Id),
    FOREIGN KEY (RoleId) REFERENCES security.Roles(Id)
);

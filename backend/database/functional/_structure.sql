-- Functional Schema Tables

CREATE SCHEMA IF NOT EXISTS functional;

-- UserProfiles Table
CREATE TABLE IF NOT EXISTS functional.UserProfiles (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL UNIQUE,
    BirthDate DATE NOT NULL,
    Gender NVARCHAR(50) NOT NULL,
    Phone NVARCHAR(20) NULL,
    IsMinor BIT DEFAULT 0,
    ProfilePictureUrl NVARCHAR(500) NULL,
    TermsAccepted BIT NOT NULL,
    PrivacyAccepted BIT NOT NULL,
    TermsVersion NVARCHAR(20) NOT NULL,
    AcceptedAt DATETIME2 NOT NULL,
    FOREIGN KEY (UserId) REFERENCES security.Users(Id)
);

-- ProfessionalData Table
CREATE TABLE IF NOT EXISTS functional.ProfessionalData (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL UNIQUE,
    RegistryNumber NVARCHAR(20) NOT NULL,
    Council NVARCHAR(50) NOT NULL,
    Specialty NVARCHAR(100) NOT NULL,
    DocumentUrl NVARCHAR(500) NOT NULL,
    VerificationStatus NVARCHAR(50) DEFAULT 'pendente',
    VerificationNotes NVARCHAR(500) NULL,
    VerifiedAt DATETIME2 NULL,
    VerifiedBy INT NULL,
    FOREIGN KEY (UserId) REFERENCES security.Users(Id)
);

-- GuardianAuthorizations Table
CREATE TABLE IF NOT EXISTS functional.GuardianAuthorizations (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL UNIQUE,
    GuardianName NVARCHAR(100) NOT NULL,
    GuardianCpf NVARCHAR(14) NOT NULL,
    GuardianEmail NVARCHAR(255) NOT NULL,
    AuthorizationToken NVARCHAR(255) NOT NULL,
    IsConfirmed BIT DEFAULT 0,
    ConfirmedAt DATETIME2 NULL,
    FOREIGN KEY (UserId) REFERENCES security.Users(Id)
);

-- AnthropometricData Table
CREATE TABLE IF NOT EXISTS functional.AnthropometricData (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    Weight DECIMAL(5,2) NOT NULL,
    Height DECIMAL(3,2) NOT NULL,
    Waist DECIMAL(5,2) NULL,
    Hip DECIMAL(5,2) NULL,
    Arm DECIMAL(5,2) NULL,
    CalculatedBMI DECIMAL(4,2) NOT NULL,
    MeasuredAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES security.Users(Id)
);

-- HealthData Table
CREATE TABLE IF NOT EXISTS functional.HealthData (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL UNIQUE,
    MedicalHistory NVARCHAR(1000) NULL,
    Medications NVARCHAR(500) NULL,
    Allergies NVARCHAR(300) NULL,
    DietaryRestrictions NVARCHAR(MAX) NULL, -- JSON array
    HealthConditions NVARCHAR(MAX) NULL, -- JSON array
    UpdatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES security.Users(Id)
);

-- LifestyleData Table
CREATE TABLE IF NOT EXISTS functional.LifestyleData (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL UNIQUE,
    ActivityLevel NVARCHAR(50) NOT NULL,
    WorkRoutine NVARCHAR(50) NULL,
    FoodPreferences NVARCHAR(MAX) NULL, -- JSON array
    PreferredExerciseTime NVARCHAR(50) NULL,
    UpdatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES security.Users(Id)
);

-- InitialProfiles Table
CREATE TABLE IF NOT EXISTS functional.InitialProfiles (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL UNIQUE,
    ProfileId NVARCHAR(50) NOT NULL,
    BMICategory NVARCHAR(50) NOT NULL,
    RiskLevel NVARCHAR(50) NOT NULL,
    InitialRecommendations NVARCHAR(MAX) NOT NULL, -- JSON array
    SuggestedWeightGoal DECIMAL(5,2) NOT NULL,
    GeneratedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES security.Users(Id)
);

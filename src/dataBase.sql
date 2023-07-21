CREATE DATABASE pape-bd;

CREATE TABLE products (
    idProduct int NOT NULL,
    nameProduct varchar(255) NOT NULL,
    brandProduct varchar(255) NOT NULL,
    descProduct varchar(255) NOT NULL,
    stockProduct int NOT NULL,
    codeProduct varchar(255) NOT NULL,
    priceProduct int NOT NULL,
    imageProduct varchar(255),
    creationDate date,
    updateDate date,
    createUser varchar(255) NOT NULL,
    PRIMARY KEY (idProduct)
); 

CREATE TABLE categories (
    idCategories int NOT NULL,
    namecategories varchar(255) NOT NULL,
    idFkProducts int NOT NULL,
    PRIMARY KEY (idCategories),
    FOREIGN KEY (idFkProducts) REFERENCES products(idProduct)
); 


CREATE DATABASE pape-bd;

CREATE TABLE products (
    idProduct int NOT NULL,
    nameProduct varchar(255) NOT NULL,
    brandProduct varchar(255) NOT NULL,
    descProduct varchar(255) NOT NULL,
    stockProduct int NOT NULL,
    codeProduct varchar(255) NOT NULL,
    priceProduct int NOT NULL,
    imageProduct varchar(255),
    creationDate date,
    updateDate date,
    createUser varchar(255) NOT NULL,
    PRIMARY KEY (idProduct)
); 

 

create database ngcash;
create schema ng;

create table ng.accounts (
  id UUID default gen_random_uuid() primary key,
  balance numeric not null
);

create table ng.users (
  id UUID default gen_random_uuid() primary key,
  username text not null unique,
  password text not null,
  accountId UUID references ng.accounts(id) not null
);

create table ng.transactions (
  id UUID default gen_random_uuid() primary key,
  debitedAccountId UUID references ng.accounts(id) not null,
  creditedAccountId UUID references ng.accounts(id) not null,
  value numeric not null,
  createdAt timestamp default current_timestamp not null
);
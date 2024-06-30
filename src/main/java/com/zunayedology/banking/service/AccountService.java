package com.zunayedology.banking.service;

import com.zunayedology.banking.dto.AccountDto;

import java.util.List;

public interface AccountService {
    Object createAccount(AccountDto accountDto);
    AccountDto updateAccount(Long id, AccountDto accountDto);
    AccountDto getAccountById(Long id);
    AccountDto deposit(Long id, double amount);
    AccountDto withdraw(Long id, double amount);
    List<AccountDto> getAllAccounts();
    void deleteAccount(Long id);
}

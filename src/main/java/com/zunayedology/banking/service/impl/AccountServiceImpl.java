package com.zunayedology.banking.service.impl;

import com.zunayedology.banking.dto.AccountDto;
import com.zunayedology.banking.entity.Account;
import com.zunayedology.banking.mapper.AccountMapper;
import com.zunayedology.banking.repository.AccountRepository;
import com.zunayedology.banking.service.AccountService;
import org.springframework.stereotype.Service;

@Service
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;

    public AccountServiceImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public AccountDto createAccount(AccountDto accountDto) {
        Account account = AccountMapper.mapToAccount(accountDto);
        Account saveAccount = accountRepository.save(account);
        return AccountMapper.mapToAccountDto(saveAccount);
    }
}

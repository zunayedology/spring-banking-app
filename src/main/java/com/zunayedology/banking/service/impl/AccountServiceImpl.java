package com.zunayedology.banking.service.impl;

import com.zunayedology.banking.dto.AccountDto;
import com.zunayedology.banking.entity.Account;
import com.zunayedology.banking.mapper.AccountMapper;
import com.zunayedology.banking.repository.AccountRepository;
import com.zunayedology.banking.service.AccountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.View;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;

    public AccountServiceImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public AccountDto createAccount(AccountDto accountDto) {
        if (accountDto.getAccountHolderName().charAt(0) != 'O') {

            Account account = AccountMapper.mapToAccount(accountDto);
            Account saveAccount = accountRepository.save(account);

            return AccountMapper.mapToAccountDto(saveAccount);
        }
         return new AccountDto();
//         throw new ResponseStatusException(new AccountDto(), HttpStatus.NOT_FOUND);
    }

    @Override
    public AccountDto getAccountById(Long id) {

        Account account = accountRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        return AccountMapper.mapToAccountDto(account);
    }

    @Override
    public AccountDto updateAccount(Long id, AccountDto accountDto) {
        Account existingAccount = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        existingAccount.setAccountHolderName(accountDto.getAccountHolderName());
        existingAccount.setBalance(accountDto.getBalance());

        Account updatedAccount = accountRepository.save(existingAccount);
        return AccountMapper.mapToAccountDto(updatedAccount);
    }

    @Override
    public AccountDto deposit(Long id, double amount) {
        Account account = accountRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        double total = account.getBalance() + amount;
        account.setBalance(total);
        Account savedAccount = accountRepository.save(account);

        return AccountMapper.mapToAccountDto(savedAccount);
    }

    @Override
    public AccountDto withdraw(Long id, double amount) {
        Account account = accountRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        if (account.getBalance() < amount){
            throw new RuntimeException("Insufficient balance");
        }

        double total = account.getBalance() - amount;
        account.setBalance(total);
        Account savedAccount = accountRepository.save(account);

        return AccountMapper.mapToAccountDto(savedAccount);
    }

    @Override
    public List<AccountDto> getAllAccounts() {
        List<Account> accounts = accountRepository.findAll();

      return accounts.stream().map(AccountMapper::mapToAccountDto)
              .collect(Collectors.toList());
    }

    @Override
    public void deleteAccount(Long id) {
        Account account = accountRepository
            .findById(id)
            .orElseThrow(() -> new RuntimeException("Account not found"));

        accountRepository.deleteById(id);
    }
}

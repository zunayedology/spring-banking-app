import React, { useState, useEffect } from "react";
import { Table, Button, message } from "antd";
import { getAccounts, deleteAccount } from "../api";
import AccountModal from "./AccountModal";
import DepositWithdrawModal from "./DepositWithdrawModal";

const AccountTable = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isAccountModalVisible, setAccountModalVisible] = useState(false);
  const [isDepositWithdrawModalVisible, setDepositWithdrawModalVisible] =
    useState(false);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    const response = await getAccounts();
    setAccounts(response.data);
  };

  const handleDelete = async (id) => {
    await deleteAccount(id);
    message.success("Account deleted successfully");
    fetchAccounts();
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Account Holder Name",
      dataIndex: "accountHolderName",
      key: "accountHolderName",
    },
    { title: "Balance", dataIndex: "balance", key: "balance" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            onClick={() => {
              setSelectedAccount(record);
              setDepositWithdrawModalVisible(true);
            }}
          >
            Deposit/Withdraw
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Button
        onClick={() => {
          setSelectedAccount(null);
          setAccountModalVisible(true);
        }}
      >
        New Account
      </Button>
      <Button
        onClick={() => setAccountModalVisible(true)}
        disabled={!selectedAccount}
      >
        Update
      </Button>
      <Button
        onClick={() => handleDelete(selectedAccount?.id)}
        disabled={!selectedAccount}
      >
        Delete
      </Button>
      <Table
        columns={columns}
        dataSource={accounts}
        rowSelection={{
          type: "radio",
          onChange: (_, selectedRows) => setSelectedAccount(selectedRows[0]),
        }}
        rowKey="id"
      />
      {isAccountModalVisible && (
        <AccountModal
          visible={isAccountModalVisible}
          onClose={() => setAccountModalVisible(false)}
          onRefresh={fetchAccounts}
          account={selectedAccount}
        />
      )}
      {isDepositWithdrawModalVisible && (
        <DepositWithdrawModal
          visible={isDepositWithdrawModalVisible}
          onClose={() => setDepositWithdrawModalVisible(false)}
          onRefresh={fetchAccounts}
          account={selectedAccount}
        />
      )}
    </>
  );
};

export default AccountTable;

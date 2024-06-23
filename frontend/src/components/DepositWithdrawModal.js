import React, { useState } from "react";
import { Modal, InputNumber, Button, message } from "antd";
import { deposit, withdraw } from "../api";

const DepositWithdrawModal = ({ visible, onClose, onRefresh, account }) => {
  const [amount, setAmount] = useState(0);

  const handleDeposit = async () => {
    await deposit(account.id, amount);
    message.success("Amount deposited successfully");
    onRefresh();
    onClose();
  };

  const handleWithdraw = async () => {
    await withdraw(account.id, amount);
    message.success("Amount withdrawn successfully");
    onRefresh();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      title="Deposit/Withdraw"
      onCancel={onClose}
      footer={[
        <Button key="withdraw" type="danger" onClick={handleWithdraw}>
          Withdraw
        </Button>,
        <Button key="deposit" type="primary" onClick={handleDeposit}>
          Deposit
        </Button>,
      ]}
    >
      <InputNumber
        min={0}
        value={amount}
        onChange={(value) => setAmount(value)}
        style={{ width: "100%" }}
      />
    </Modal>
  );
};

export default DepositWithdrawModal;

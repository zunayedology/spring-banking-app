import React, { useEffect } from "react";
import { Modal, Form, Input, InputNumber, Button } from "antd";
import { createAccount, updateAccount } from "../api";

const AccountModal = ({ visible, onClose, onRefresh, account }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (account) {
      form.setFieldsValue(account);
    } else {
      form.resetFields();
    }
  }, [account, form]);

  const handleSubmit = async () => {
    const values = await form.validateFields();
    if (account) {
      await updateAccount(account.id, values);
    } else {
      await createAccount(values);
    }
    onRefresh();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      title={account ? "Update Account" : "New Account"}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          {account ? "Update" : "Create"}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="accountHolderName"
          label="Account Holder Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="balance" label="Balance" rules={[{ required: true }]}>
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AccountModal;

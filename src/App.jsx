/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ExchangeRates from "./components/ExchangeRates";
import "@arco-design/web-react/dist/css/arco.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { ProtectedRoute } from "./hooks";
import InActivityTimeOut from "./hooks/InActivityTimeOut";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Navigate,
} from "react-router-dom";
import Dashboard from "./Routes/User/Dashboard";
import AgentDashboard from "./Routes/Agent/Dashboard";
import Beneficiary from "./Routes/User/Beneficiary";
import BeneficiaryDetails from "./Routes/User/BeneficiaryDetails";
import CreateBeneficiary from "./Routes/User/CreateBeneficiary";
import History from "./Routes/User/History";
import TransactionDetails from "./Routes/User/TransactionDetails";
import "react-toastify/dist/ReactToastify.css";
import UploadBeneficiaryFiles from "./Routes/User/UploadBeneficiaryFiles";
import SendMoney from "./Routes/User/SendMoney";
import Wallet from "./Routes/User/Wallet";
import AgentCustomer from "./Routes/Agent/AgentCustomer";
import Kyc from "./reuseables/Kyc";
import Settings from "./Routes/User/Settings";
import CustomerContactDetails from "./Routes/User/Settings/CustomerContactDetails";
import IdDocuments from "./Routes/User/Settings/IdDocuments";
import UploadId from "./Routes/User/UploadId";
import DocumentUpload from "./Routes/User/DocumentUpload";
import ChangeAddress from "./Routes/User/Settings/ChangeAddress";
import Wallets from "./Routes/User/Settings/Wallets";
import WalletsDetails from "./Routes/User/Settings/WalletsDetails";
import ChangePassord from "./Routes/User/Settings/ChangePassword";
import AddWallet from "./Routes/User/Settings/AddWallet";
import { Toaster } from "react-hot-toast";
import AgentHistory from "./Routes/Agent/History";
import AgentSettings from "./Routes/Agent/Settings";
import CustomerContactDetailsAgent from "./Routes/Agent/Settings/CustomerContactDetails";
import IdDocumentsAgent from "./Routes/Agent/Settings/IdDocuments";
import ChangeAddressAgent from "./Routes/Agent/Settings/ChangeAddress";
import ChangePassordAgent from "./Routes/Agent/Settings/ChangePassword";
import WalletsAgent from "./Routes/Agent/Settings/Wallets";
import AddWalletAgent from "./Routes/Agent/Settings/AddWallet";
import WalletsDetailsAgent from "./Routes/Agent/Settings/WalletsDetails";
import UpdateRate from "./Routes/Agent/UpdateRate";
import DocumentUploadAgent from "./Routes/Agent/DocumentUpload";
import TransactionDetailsAgent from "./Routes/Agent/TransactionDetails";
import UpdateRateCustomer from "./Routes/Agent/UpdateRateCustomer";
import ResetPassword from "./components/ResetPassword";
//

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route element={<InActivityTimeOut />}> */}
          <Route>
            <Route path="/" element={<Login />} />
            <Route path="/reset" element={<ResetPassword />} />
            <Route path="/signup" element={<Register />} />

            {/* Dashboard Routes */}
            {/* <Route element={<ProtectedRoute />}> */}
            <Route path="/user/dashboard" element={<Dashboard />} />
            <Route path="/user/beneficiary" element={<Beneficiary />} />
            <Route
              path="/user/beneficiary/details"
              element={<BeneficiaryDetails />}
            />
            <Route
              path="/user/beneficiary/upload"
              element={<UploadBeneficiaryFiles />}
            />
            <Route
              path="/user/create/beneficiary"
              element={<CreateBeneficiary />}
            />
            <Route path="/user/transactions/" element={<History />} />
            <Route
              path="/user/transactions/details"
              element={<TransactionDetails />}
            />
            <Route
              path="/agent/transactions/details"
              element={<TransactionDetailsAgent />}
            />
            <Route path="/user/sendmoney" element={<SendMoney />} />
            <Route path="/agent/update-rate" element={<UpdateRate />} />
            <Route
              path="/agent/update-rate-customer"
              element={<UpdateRateCustomer />}
            />
            <Route path="/user/transaction/history" element={<Dashboard />} />
            <Route path="/user/setting" element={<Dashboard />} />
            <Route path="/user/wallet" element={<Wallet />} />
            <Route path="/agent/dashboard" element={<AgentDashboard />} />
            <Route path="/agent/customers" element={<AgentCustomer />} />
            <Route path="/agent/transactions" element={<AgentHistory />} />
            <Route path="/kyc" element={<Kyc />} />
            {/* Settings */}
            <Route path="/settings" element={<Settings />} />
            <Route path="/agent/setting" element={<AgentSettings />} />
            <Route
              path="/customer/contact/details"
              element={<CustomerContactDetails />}
            />
            <Route path="/user/id/documents" element={<IdDocuments />} />
            <Route path="/user/settings/address" element={<ChangeAddress />} />
            <Route path="/user/settings/password" element={<ChangePassord />} />
            <Route path="/user/settings/wallet" element={<Wallets />} />
            <Route path="/user/settings/add-wallet" element={<AddWallet />} />
            <Route
              path="/user/settings/wallet/:id"
              element={<WalletsDetails />}
            />

            <Route
              path="/agent/contact/details"
              element={<CustomerContactDetailsAgent />}
            />
            <Route path="/agent/id/documents" element={<IdDocumentsAgent />} />
            <Route
              path="/agent/settings/address"
              element={<ChangeAddressAgent />}
            />
            <Route
              path="/agent/settings/password"
              element={<ChangePassordAgent />}
            />
            <Route path="/agent/settings/wallet" element={<WalletsAgent />} />
            <Route
              path="/agent/settings/add-wallet"
              element={<AddWalletAgent />}
            />
            <Route
              path="/agent/settings/wallet/:id"
              element={<WalletsDetailsAgent />}
            />
            <Route path="/user/upload" element={<DocumentUpload />} />
            <Route path="/agent/upload" element={<DocumentUploadAgent />} />
            <Route path="/upload" element={<UploadId />} />
            <Route
              path="/idscan"
              render={() => {
                window.location.href = "idscan.html";
              }}
            />

            {/* Settings End */}
            {/* </Route> */}
            <Route path="*" element={<h1>Error</h1>} />
          </Route>
        </Routes>
      </Router>
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            style: {
              fontSize: "16px",
              marginTop: "14px",
              color: "white",
              background: "#3fb172",
              padding: "10px",
              zIndex: "18888000000",
              position: "relative",
            },
          },
          error: {
            style: {
              fontSize: "16px",
              marginTop: "14px",
              color: "white",
              background: "#ff0000",
              padding: "10px",
              position: "relative",
              zIndex: "18888000000",
            },
          },
        }}
      />
    </>
  );
}

export default App;

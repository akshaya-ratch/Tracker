import { Navigate, Route, Routes } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import { WorkspaceProvider } from './state/WorkspaceContext'
import Dashboard from './pages/Dashboard'
import Companies from './pages/Companies'
import CompanyDetails from './pages/CompanyDetails'
import Spreadsheet from './pages/Spreadsheet'

export default function App() {
  return (
    <WorkspaceProvider>
      <AppShell>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/companies/:id" element={<CompanyDetails />} />
          <Route path="/spreadsheet" element={<Spreadsheet />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
    </WorkspaceProvider>
  )
}

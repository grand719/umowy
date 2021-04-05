import React from 'react'
import ContractsList from './ContractsList'
import ContractListFilter from './ContractsListFilter'

const ContractsDashboardPage = () => (
    <div className="contract-dashboard-page">
        <ContractListFilter />
        <ContractsList />
    </div>
)

export default ContractsDashboardPage;
import React from 'react'
import ContractsList from './ContractsList'
import ContractListFilter from './ContractsListFilter'

const ContractsDashboardPage = () => (
    <div>
        <ContractListFilter />
        <ContractsList />
    </div>
)

export default ContractsDashboardPage;
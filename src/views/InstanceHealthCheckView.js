import React from 'react';
import StatusCheckCard from '../components/StatusCheckCard';

const headers = ['Service Name', 'Site Name', 'Status'];

const data = {
    cellData: [
        ['재직증명서발급서비스', '현대카드', 'OK'],
        ['모바일사원증발급서비스', '현대카드', 'OK'],
        ['갑근세영수증발급서비스', '현대카드', 'OK'],
        ['법인카드발급서비스', '현대카드', 'OK'],
        ['재직증명서발급서비스', '현대카드', 'OK'],
        ['모바일사원증발급서비스', '현대카드', 'OK'],
        ['갑근세영수증발급서비스', '현대카드', 'OK'],
        ['법인카드발급서비스', '현대카드', 'OK']
    ]
}

const InstanceHealthCheckView = () => (
    <StatusCheckCard
        title={'Instance Health Check'}
        headers={headers}
        data={data} />
);

export default InstanceHealthCheckView;
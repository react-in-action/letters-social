import React from 'react';
import { update } from '../backend/database';

export default function Profile() {
    return (
        <div className="profile">
            <div className="row">
                <div className="col-xs-offset-2 col-xs-8">
                    <h2>
                        Profile settings!
                    </h2>
                    <input
                        onChange={e => {
                            update(e.value).then(res => {
                                console.log(res);
                            });
                        }}
                        type="text"
                    />
                </div>
            </div>
        </div>
    );
}

/* 
 * $Id$
 * created by    : yukm
 * creation-date : 2014. 4. 9.
 * =========================================================
 * Copyright (c) 2014 ManinSoft, Inc. All rights reserved.
 */

package net.smartworks.factory;

import net.smartworks.skkupss.manager.IDbManager;
import net.smartworks.skkupss.manager.impl.DbManagerImpl;


public class ManagerFactory {

	private static ManagerFactory managerFactory;
	private static IDbManager dbManager;
	
	public static ManagerFactory getInstance() {
		if (managerFactory != null) {
			return managerFactory;
		} else {
			managerFactory = new ManagerFactory();
			return managerFactory;
		}
	}
	public IDbManager getDbManager() throws Exception {
		if (dbManager != null) {
			return dbManager;
		} else {
			dbManager = new DbManagerImpl();
			return dbManager;
		}
	}
}
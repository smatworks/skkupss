/* 
 * $Id$
 * created by    : yukm
 * creation-date : 2014. 11. 20.
 * =========================================================
 * Copyright (c) 2014 ManinSoft, Inc. All rights reserved.
 */

package net.smartworks.skkupss.dao;

import java.util.List;
import java.util.Map;

import net.smartworks.skkupss.model.BusinessContext;
import net.smartworks.skkupss.model.SBPService;
import net.smartworks.skkupss.model.db.Db_BizModelSpace;
import net.smartworks.skkupss.model.db.Db_BizModelSpaceCond;
import net.smartworks.skkupss.model.db.Db_CustomerType;
import net.smartworks.skkupss.model.db.Db_ProductService;
import net.smartworks.skkupss.model.db.Db_ProductServiceCond;
import net.smartworks.skkupss.model.db.Db_ServiceSpace;
import net.smartworks.skkupss.model.db.Db_ServiceSpaceCond;
import net.smartworks.skkupss.model.db.Db_UnspscName;
import net.smartworks.skkupss.model.db.Db_User;
import net.smartworks.skkupss.model.db.Db_UserCond;
import net.smartworks.skkupss.model.db.Db_ValueSpace;
import net.smartworks.skkupss.model.db.Db_ValueSpaceCond;

public interface IDbDao {
	
	public int getProductServiceWithSelectedSpaceSize(String userId, String spaceType, Db_ProductServiceCond cond) throws Exception;
	public Db_ProductService[] getProductServiceWithSelectedSpace(String userId, String spaceType, Db_ProductServiceCond cond) throws Exception;

	public Db_ProductService getProductService(String userId, String id) throws Exception;
	public String setProductService(String userId, Db_ProductService productService) throws Exception;
	public void removeProductService(String userId, String id) throws Exception;
	public Db_ProductService[] getProductServices(String userId, Db_ProductServiceCond cond) throws Exception;
	
	public String getProductServicePicture(String userId, String psId) throws Exception;
	
	public Db_ValueSpace getValueSpace(String userId, String id) throws Exception;
	public void setValueSpace(String userId, Db_ValueSpace valueSpace) throws Exception;
	public void removeValueSpace(String userId, String id) throws Exception;
	public void removeValueSpaceByProductId(String userId, String productId) throws Exception;
	public Db_ValueSpace[] getValueSpaces(String userId, Db_ValueSpaceCond cond) throws Exception;

	public Db_ServiceSpace getServiceSpace(String userId, String id) throws Exception;
	public void setServiceSpace(String userId, Db_ServiceSpace serviceSpace) throws Exception;
	public void removeServiceSpace(String userId, String id) throws Exception;
	public void removeServiceSpaceByProductId(String userId, String productId) throws Exception;
	public Db_ServiceSpace[] getServiceSpaces(String userId, Db_ServiceSpaceCond cond) throws Exception;
	
	public Db_BizModelSpace getBizModelSpace(String userId, String id) throws Exception;
	public void setBizModelSpace(String userId, Db_BizModelSpace bizModelSpace) throws Exception;
	public void removeBizModelSpace(String userId, String id) throws Exception;
	public void removeBizModelSpaceByProductId(String userId, String productId) throws Exception;
	public Db_BizModelSpace[] getBizModelSpaces(String userId, Db_BizModelSpaceCond cond) throws Exception;
	
	public Db_User getUser(String userId, String id) throws Exception;
	public String setUser(String userId, Db_User user) throws Exception;
	public void removeUser(String userId, String id) throws Exception;
	public int getUserSize(String userId, Db_UserCond cond) throws Exception;
	public Db_User[] getUsers(String userId, Db_UserCond cond) throws Exception;
	
	public String[] getUnspscCodes(int level, Map<String, String> params) throws Exception;
	public Db_UnspscName[] getUnspscNames(int level, Map<String, String> params) throws Exception;
	
	public Db_CustomerType[] getCustomerTypes(int level, Map<String, String> params) throws Exception;
	public String getCustomerName(String id) throws Exception;
	
	
	public boolean disConnect_SBPService(SBPService serviceSpace, String psId) throws Exception;
	public boolean updateSbpMapData(String result_data, String psId, String itemName) throws Exception;
	public SBPService selectSbpMapData(String psId) throws Exception;				// SBP Map에서 선택한 activity정보들을 DB에 채운다.						
	public SBPService getSBPService(String psId) throws Exception;									// 연결된 SBP Project 정보를 가져온다.
	public boolean set_PSS_SBP_Servcie_Connect(Map<String, Object> requestBody) throws Exception; 	// PSS 프로젝트와 SBP프로젝트를 연결시켜준다. 
	public boolean set_PSS_BusinessContext(Map<String, String> requestBody) throws Exception;
	public BusinessContext get_PSS_BusinessContext(String psId) throws Exception;
}
